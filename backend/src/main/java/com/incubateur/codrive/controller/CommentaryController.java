package com.incubateur.codrive.controller;

import com.incubateur.codrive.dto.CommentaryDto;
import com.incubateur.codrive.entity.Commentary;
import com.incubateur.codrive.entity.Info;
import com.incubateur.codrive.entity.User;
import com.incubateur.codrive.entity.UserBooking;
import com.incubateur.codrive.mapper.CommentaryMapper;
import com.incubateur.codrive.repository.CommentaryRepository;
import com.incubateur.codrive.service.CommentaryServices;
import com.incubateur.codrive.service.InfoService;
import com.incubateur.codrive.service.UserService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@SpringBootApplication
@RequestMapping("/commentary")
public class CommentaryController {

    @Autowired
    CommentaryServices commentaryServices;

    @Autowired
    UserService userService;

    @Autowired
    InfoService infoService;

    @Autowired
    CommentaryRepository commentaryRepository;

    @PostMapping("/add")
    public Commentary newCommentary(@AuthenticationPrincipal @NonNull UserDetails userDetails,
                                    @RequestBody CommentaryDto dto) {

        Commentary com = new Commentary();

        User user = userService.getUserByMail(userDetails.getUsername());

        Info infoId = infoService.getInfoTravel(dto.getInfo().getId());

        com.setNote(dto.getNote());
        com.setText(dto.getText());
        com.setDatePublication(dto.getDatePublication());
        com.setReport(false);
        com.setNumberReport(0);
        com.setAnonymous(dto.getAnonymous());
        com.setInfo(infoId);
        com.setUser(user);

        return commentaryServices.saveCommentary(com);
    }

    @PutMapping("/report/{id}")
    public Commentary reportCommentary(@PathVariable("id") Long id) {
        Commentary comment = commentaryServices.findById(id);
        comment.setReport(true);
        comment.setNumberReport(comment.getNumberReport() + 1);
        return commentaryServices.saveCommentary(comment);
    }

    @GetMapping("/getCommentaryByUserId/{userId}")
    public List<Commentary> getInfoByUserId(@PathVariable("userId") Long userId) {
        return commentaryRepository.findByUserId(userId);
    }

    /**
     * Get a List of {@link Commentary} about if {@link User} connect with the {@link Info}
     * @param userDetails {@link User} connect
     * @param id id of {@link Info}
     * @return List of {@link Commentary}
     */
    @GetMapping("/note/{infoId}")
    public List<Commentary> getCommentByInfoAndUser(@AuthenticationPrincipal @NonNull UserDetails userDetails,
                                            @PathVariable("infoId") Long id)   {

        User user = userService.getUserByMail(userDetails.getUsername());
        List<Commentary> comments = commentaryServices.findAll();

        comments = comments.stream()
                .filter(com -> com.getInfo().getId().equals(id))
                .filter(com -> com.getUser().getId().equals(user.getId()))
                .collect(Collectors.toList());

        return comments;
    }

    @GetMapping("/note/travel/{infoId}")
    public Double getNoteTravel(@PathVariable("infoId") Long id) {
        return commentaryServices.noteOfTravel(id);
    }


    }
