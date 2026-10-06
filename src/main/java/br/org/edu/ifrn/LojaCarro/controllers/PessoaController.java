
package br.org.edu.ifrn.LojaCarro.controllers;

import br.org.edu.ifrn.LojaCarro.model.Carro;
import br.org.edu.ifrn.LojaCarro.model.Pessoa;
import br.org.edu.ifrn.LojaCarro.services.CarroService;
import br.org.edu.ifrn.LojaCarro.services.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    // Salvar pessoa (corrigido para POST)
    @PostMapping("salvar")
    public ResponseEntity<Pessoa> salvarPessoa(@RequestBody Pessoa p) {
        Pessoa savedPessoa = pessoaService.save(p);
        return ResponseEntity.ok(savedPessoa);
    }

    // Atualizar pessoa (por ID)
    @PutMapping("/{id}")
    public ResponseEntity<Pessoa> atualizarPessoa(@PathVariable Long id, @RequestBody Pessoa p) {
        p.setId(id);  // Define o ID no objeto
        Pessoa updatedPessoa = pessoaService.update(p);
        return ResponseEntity.ok(updatedPessoa);
    }

    // Deletar pessoa (por ID)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPessoa(@PathVariable Long id) {
        pessoaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Pesquisar pessoa por ID
    @GetMapping("/{id}")
    public ResponseEntity<Pessoa> pesquisarPessoaPorId(@PathVariable Long id) {
        Optional<Pessoa> pessoa = pessoaService.findById(id);
        return pessoa.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Pesquisar todas as pessoas
    @GetMapping
    public ResponseEntity<List<Pessoa>> pesquisarTodasPessoas() {
        List<Pessoa> pessoas = pessoaService.findAll();
        return ResponseEntity.ok(pessoas);
    }
}