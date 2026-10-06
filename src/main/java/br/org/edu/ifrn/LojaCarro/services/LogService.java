package br.org.edu.ifrn.LojaCarro.services;

import br.org.edu.ifrn.LojaCarro.model.Log;
import br.org.edu.ifrn.LojaCarro.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LogService {

    @Autowired
    private LogRepository logRepository;

    public Log registrar(String acao, String descricao) {
        Log log = new Log(
                acao,
                descricao,
                LocalDateTime.now()
        );

        return logRepository.save(log);
    }

    public Log save(Log log) {
        if (log.getDataHora() == null) {
            log.setDataHora(LocalDateTime.now());
        }

        return logRepository.save(log);
    }

    public List<Log> findAll() {
        return logRepository.findAll();
    }

    public Optional<Log> findById(Long id) {
        return logRepository.findById(id);
    }

    public void deleteById(Long id) {
        logRepository.deleteById(id);
    }
}