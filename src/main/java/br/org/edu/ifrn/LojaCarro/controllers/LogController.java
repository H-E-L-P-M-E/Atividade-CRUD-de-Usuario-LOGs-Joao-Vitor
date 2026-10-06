package br.org.edu.ifrn.LojaCarro.controllers;

import br.org.edu.ifrn.LojaCarro.model.Log;
import br.org.edu.ifrn.LojaCarro.services.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/log")
public class LogController {

    @Autowired
    private LogService logService;

    @PostMapping("/salvar")
    public ResponseEntity<Log> salvarLog(@RequestBody Log log) {
        Log savedLog = logService.save(log);
        return ResponseEntity.ok(savedLog);
    }

    @GetMapping
    public ResponseEntity<List<Log>> listarLogs() {
        return ResponseEntity.ok(logService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Log> pesquisarLogPorId(@PathVariable Long id) {
        Optional<Log> log = logService.findById(id);

        return log
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarLog(@PathVariable Long id) {
        logService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}