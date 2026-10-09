package br.com.benerh.diagnostico;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
class DiagnosticoControllerTest {

    @Autowired MockMvc mvc;
    @Autowired DiagnosticoRepository repository;

    @BeforeEach
    void limpar() {
        repository.deleteAll();
    }

    private static String body(String contact, boolean consent) {
        return """
            {"contact":%s,
             "answers":[
               {"id":"porte","question":"Quantas pessoas trabalham na empresa?","answer":"1 a 7","value":2},
               {"id":"consentimento","question":"Posso enviar estas respostas?","answer":"Sim","value":6}],
             "score":8,"route":"Diagnóstico + Estruturação","consent":%s,
             "source":"site-diagnostico","locale":"pt","page":"https://benerh.com.br/#diagnostico",
             "submittedAt":"2026-10-09T12:00:00.000Z",
             "utm":{"utm_source":"instagram","utm_campaign":"lancamento"}}
            """.formatted(contact, consent);
    }

    @Test
    void salvaDiagnosticoComTelefone() throws Exception {
        mvc.perform(post("/diagnostico").contentType(MediaType.APPLICATION_JSON)
                        .content(body("{\"type\":\"phone\",\"value\":\"5511932147954\"}", true)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.ok").value(true))
                .andExpect(jsonPath("$.id").isNumber());

        assertThat(repository.count()).isEqualTo(1);
        Diagnostico d = repository.findAll().get(0);
        assertThat(d.getContactType()).isEqualTo("phone");
        assertThat(d.getContactValue()).isEqualTo("5511932147954");
        assertThat(d.getScore()).isEqualTo(8);
        assertThat(d.getUtmSource()).isEqualTo("instagram");
        assertThat(d.getUtmCampaign()).isEqualTo("lancamento");
        assertThat(d.getRespostas()).hasSize(2);
        assertThat(d.getRespostas().get(0).getQuestionId()).isEqualTo("porte");
        assertThat(d.getRespostas().get(1).getOrdem()).isEqualTo(2);
    }

    @Test
    void salvaDiagnosticoComEmailNormalizado() throws Exception {
        mvc.perform(post("/diagnostico").contentType(MediaType.APPLICATION_JSON)
                        .content(body("{\"type\":\"email\",\"value\":\"  Voce@Empresa.com.br \"}", true)))
                .andExpect(status().isCreated());
        assertThat(repository.findAll().get(0).getContactValue()).isEqualTo("voce@empresa.com.br");
    }

    @Test
    void rejeitaSemConsentimento() throws Exception {
        mvc.perform(post("/diagnostico").contentType(MediaType.APPLICATION_JSON)
                        .content(body("{\"type\":\"email\",\"value\":\"a@b.co\"}", false)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").exists());
        assertThat(repository.count()).isZero();
    }

    @Test
    void rejeitaContatoInvalido() throws Exception {
        mvc.perform(post("/diagnostico").contentType(MediaType.APPLICATION_JSON)
                        .content(body("{\"type\":\"email\",\"value\":\"abc\"}", true)))
                .andExpect(status().isBadRequest());
        mvc.perform(post("/diagnostico").contentType(MediaType.APPLICATION_JSON)
                        .content(body("{\"type\":\"phone\",\"value\":\"1193214\"}", true)))
                .andExpect(status().isBadRequest());
        assertThat(repository.count()).isZero();
    }

    @Test
    void rejeitaJsonQuebrado() throws Exception {
        mvc.perform(post("/diagnostico").contentType(MediaType.APPLICATION_JSON).content("{nope"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void respondeAoPreflightDoSite() throws Exception {
        mvc.perform(options("/diagnostico")
                        .header("Origin", "https://benerh.com.br")
                        .header("Access-Control-Request-Method", "POST")
                        .header("Access-Control-Request-Headers", "content-type"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "https://benerh.com.br"));
    }
}
