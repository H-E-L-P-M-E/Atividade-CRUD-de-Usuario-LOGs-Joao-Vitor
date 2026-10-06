package br.org.edu.ifrn.LojaCarro.services;

import br.org.edu.ifrn.LojaCarro.model.Pessoa;
import br.org.edu.ifrn.LojaCarro.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {

    @Autowired
    public PessoaRepository pessoaRepository;

    @Autowired
    private LogService logService;

    public Pessoa save(Pessoa p) {
        Pessoa pessoaSalva = pessoaRepository.save(p);

        logService.registrar(
                "CADASTRO",
                "Pessoa cadastrada: ID " + pessoaSalva.getId()
        );

        return pessoaSalva;
    }

    public void deleteById(Long id) {
        pessoaRepository.deleteById(id);

        logService.registrar(
                "EXCLUSÃO",
                "Pessoa excluída: ID " + id
        );
    }

    public Optional<Pessoa> findById(Long id) {
        return pessoaRepository.findById(id);
    }

    public List<Pessoa> findAll() {
        return pessoaRepository.findAll();
    }

    public Pessoa update(Pessoa p) {
        Pessoa pessoaAtualizada = pessoaRepository.save(p);

        logService.registrar(
                "ATUALIZAÇÃO",
                "Pessoa atualizada: ID " + pessoaAtualizada.getId()
        );

        return pessoaAtualizada;
    }
}