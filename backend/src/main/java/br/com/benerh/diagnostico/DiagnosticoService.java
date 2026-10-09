package br.com.benerh.diagnostico;

import java.util.Locale;
import java.util.Map;
import java.util.regex.Pattern;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DiagnosticoService {

    private static final Pattern EMAIL = Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    /** Celular ou fixo brasileiro com DDI: 55 + DDD + 8 ou 9 dígitos (é como o site normaliza). */
    private static final Pattern PHONE = Pattern.compile("^55[1-9]{2}9?\\d{8}$");

    private final DiagnosticoRepository repository;

    public DiagnosticoService(DiagnosticoRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Long salvar(DiagnosticoRequest request) {
        String type = request.contact().type();
        String value = request.contact().value().trim();
        if ("email".equals(type)) {
            value = value.toLowerCase(Locale.ROOT);
            if (!EMAIL.matcher(value).matches()) {
                throw new IllegalArgumentException("Informe um e-mail válido.");
            }
        } else if (!PHONE.matcher(value).matches()) {
            throw new IllegalArgumentException("Informe um telefone válido com DDD.");
        }

        Diagnostico d = new Diagnostico();
        d.setContactType(type);
        d.setContactValue(value);
        d.setScore(request.score());
        d.setRoute(request.route());
        d.setConsent(request.consent());
        d.setSource(request.source() == null || request.source().isBlank() ? "site" : request.source());
        d.setLocale(request.locale() == null || request.locale().isBlank() ? "pt" : request.locale());
        d.setPage(request.page());
        d.setSubmittedAt(request.submittedAt());

        Map<String, String> utm = request.utm() == null ? Map.of() : request.utm();
        d.setUtmSource(utm.get("utm_source"));
        d.setUtmMedium(utm.get("utm_medium"));
        d.setUtmCampaign(utm.get("utm_campaign"));
        d.setUtmContent(utm.get("utm_content"));
        d.setUtmTerm(utm.get("utm_term"));

        int ordem = 1;
        for (DiagnosticoRequest.Answer a : request.answers()) {
            DiagnosticoResposta r = new DiagnosticoResposta();
            r.setOrdem(ordem++);
            r.setQuestionId(a.id());
            r.setQuestion(a.question());
            r.setAnswer(a.answer());
            r.setValue(a.value());
            d.addResposta(r);
        }
        return repository.save(d).getId();
    }
}
