package desaio.visuals.visuals.service;

import desaio.visuals.visuals.commons.exception.NotFoundException;
import desaio.visuals.visuals.domain.User;
import desaio.visuals.visuals.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;

    public List<User>findAll(String name){
        return name == null ? repository.findAll() : repository.findByName(name);
    }

    public User findByIdOrThrowNotFound(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Not found"));
    }

    public User save(User user){
        return repository.save(user);
    }

    public void deleteOrThrowNotFound(Long id){
        var delete = findByIdOrThrowNotFound(id);
        repository.delete(delete);
    }

    public void update(User user){
        var updated = findByIdOrThrowNotFound(user.getId());
        updated.setName(user.getName());
        updated.setEmail(user.getEmail());
        updated.setCellPhone(user.getCellPhone());
        updated.setCity(user.getCity());
        repository.save(updated);
    }
}
