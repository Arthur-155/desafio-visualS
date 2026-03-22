package desaio.visuals.visuals.controller;

import desaio.visuals.visuals.domain.User;
import desaio.visuals.visuals.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @GetMapping
    public List<User> findAll(@RequestParam(required = false) String name) {
        return service.findAll(name);
    }

    @GetMapping("{id}")
    public User findByIdOrThrowNotFound(@PathVariable Long id) {
        return service.findByIdOrThrowNotFound(id);
    }

    @PostMapping
    public User save(@RequestBody User user) {
        return service.save(user);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable Long id) {
        service.deleteOrThrowNotFound(id);
    }

    @PutMapping
    public void update(@RequestBody User user) {
        service.update(user);
    }
}
