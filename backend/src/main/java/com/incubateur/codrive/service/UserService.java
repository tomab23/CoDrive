package com.incubateur.codrive.service;


import com.incubateur.codrive.entity.User;
import com.incubateur.codrive.repository.UserRepository;
import com.incubateur.codrive.service.impl.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepo;

    public User getUserByMail(String mail) {
        return userRepo.findByMail(mail);
    }

    @Override
    public List<User> allUser() {
        return userRepo.findAll();
    }
    @Override
    public Optional<User> getUserById(Long id){return  userRepo.findById(id);}

    //TODO: enlever getUserTravel et le remplacer par findById dans les methodes
    @Override
    public User getUserTravel(Long id) {
        return userRepo.getReferenceById(id);
    }


    @Override
    public User save(User user) {
        return userRepo.save(user);
    }

    @Override
    public User findById(Long id) {
        return userRepo.getReferenceById(id);
    }

    @Override
    public User lastId() {
        return userRepo.LastUser();
    }


}