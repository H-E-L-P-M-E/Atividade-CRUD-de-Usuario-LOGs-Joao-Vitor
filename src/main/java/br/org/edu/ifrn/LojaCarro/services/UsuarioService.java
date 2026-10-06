package br.org.edu.ifrn.LojaCarro.services;

import br.org.edu.ifrn.LojaCarro.model.Usuario;
import br.org.edu.ifrn.LojaCarro.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private LogService logService;

    public Usuario save(Usuario usuario) {
        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        logService.registrar(
                "CADASTRO",
                "Usuário cadastrado: ID " + usuarioSalvo.getId() +
                        ", nome " + usuarioSalvo.getNome()
        );

        return usuarioSalvo;
    }

    public void deleteById(Long id) {
        usuarioRepository.deleteById(id);

        logService.registrar(
                "EXCLUSÃO",
                "Usuário excluído: ID " + id
        );
    }

    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario update(Usuario usuario) {
        Usuario usuarioAtualizado = usuarioRepository.save(usuario);

        logService.registrar(
                "ATUALIZAÇÃO",
                "Usuário atualizado: ID " + usuarioAtualizado.getId() +
                        ", nome " + usuarioAtualizado.getNome()
        );

        return usuarioAtualizado;
    }
}