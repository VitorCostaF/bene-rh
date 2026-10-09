package br.com.benerh.diagnostico;

import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.util.List;
import java.util.Map;

/** Corpo do POST enviado pelo formulário do diagnóstico (app/HomeClient.tsx). */
public record DiagnosticoRequest(
        @NotNull @Valid Contact contact,
        @NotNull @Size(min = 1, max = 20) List<@NotNull @Valid Answer> answers,
        @NotNull @PositiveOrZero @Max(1000) Integer score,
        @Size(max = 120) String route,
        @AssertTrue(message = "O consentimento é obrigatório.") boolean consent,
        @Size(max = 40) String source,
        @Size(max = 5) String locale,
        @Size(max = 500) String page,
        Instant submittedAt,
        @Size(max = 10) Map<@Size(max = 40) String, @Size(max = 200) String> utm) {

    public record Contact(
            @NotBlank @Pattern(regexp = "email|phone", message = "Use 'email' ou 'phone'.") String type,
            @NotBlank @Size(max = 254) String value) {}

    public record Answer(
            @NotBlank @Size(max = 40) String id,
            @NotBlank @Size(max = 300) String question,
            @NotBlank @Size(max = 300) String answer,
            @NotNull Integer value) {}
}
