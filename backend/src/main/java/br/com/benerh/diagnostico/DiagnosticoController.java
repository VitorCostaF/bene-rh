package br.com.benerh.diagnostico;

import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DiagnosticoController {

    private final DiagnosticoService service;

    public DiagnosticoController(DiagnosticoService service) {
        this.service = service;
    }

    @PostMapping("/diagnostico")
    public ResponseEntity<Map<String, Object>> receber(@Valid @RequestBody DiagnosticoRequest request) {
        Long id = service.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("ok", true, "id", id));
    }
}
