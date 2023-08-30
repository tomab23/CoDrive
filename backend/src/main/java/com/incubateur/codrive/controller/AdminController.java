package com.incubateur.codrive.controller;


import com.incubateur.codrive.entity.*;
import com.incubateur.codrive.repository.*;
import com.incubateur.codrive.service.InfoService;
import com.incubateur.codrive.service.UserService;
import com.incubateur.codrive.service.impl.IInfoService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@SpringBootApplication
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ArchiveCommentaryRepository ArchiveCommentaryRepository;

    @Autowired
    private CommentaryRepository commentaryRepository;

    @Autowired
    private InfoService infoService;

    @Autowired
    private UserService userService;

    @Autowired
    private InfoRepository infoRepository;

    @Autowired
    private ArchiveCommentaryRepository archiveCommentaryRepository;

    @GetMapping("/user")
    public List<User> getAllPeople() {
        return userRepository.findAll();
    }

    @DeleteMapping("{userid}")
    public void deleteUser(@PathVariable("userid") Long id) {
        userRepository.deleteById(id);
    }


    @GetMapping("/commentary")
    public List<Commentary> getAllCommentary() {
        return commentaryRepository.findAll();
    }

    @GetMapping("/transaction")
    public List<Transaction> getAllTransaction() {
      return transactionRepository.findAll();
    }

    @GetMapping("/transaction/{userId}")
    public List<Transaction> getTransactionByUserID(@PathVariable("userId") Long userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);

        return transactions.stream()
                .sorted(Comparator.comparing(Transaction::getId).reversed())
                .collect(Collectors.toList());
    }



    @GetMapping("/commentaryReported")
    public List<Commentary> getCommentaryReported() {
        List<Commentary> commentaryReported = commentaryRepository.findAll();


        return commentaryReported.stream()
                .filter(commentary -> commentary.getReport().equals(true))
                .collect(Collectors.toList());
    }

    @PutMapping("/commentary/{commentaryId}")
    public void updateReportStatus(@PathVariable("commentaryId") Long commentaryId) {
        Commentary commentary = commentaryRepository.findById(commentaryId).orElseThrow();
        commentary.setReport(false);
        commentary.setNumberReport(0);

        commentaryRepository.save(commentary);
    }

    @GetMapping("/info")
    public Optional<List<Info>> getInfo() {
        Optional<List<Info>> infoAdmin = infoService.getInfo();
        return infoAdmin;
    }



    @DeleteMapping("/delete/{commentaryId}")
    public void deleteCommentary(@PathVariable("commentaryId") Long id) {
        commentaryRepository.deleteById(id);
    }

    @PutMapping("/updateUser/{id}")
    public User updateUserProfile(@PathVariable("id") Long id, @RequestBody User updateUser) {
        User user = userService.findById(id);

        user.setMail(updateUser.getMail());
        user.setPoints(updateUser.getPoints());
        user.setRole(updateUser.getRole());
        user.setDateOfBirth(updateUser.getDateOfBirth());

        User savedUser = userService.save(user);
        return savedUser;
    }

    @GetMapping("search")
    public List<Info> getTravelWithReference(@RequestParam(name = "reference") String reference){
        List<Info> infoList = infoRepository.findByReferenceContaining(reference);
        return infoList;
    }

    record NewArchive(
            String text,
            String firstname,
            String lastname,
            Double note,
            LocalDate datePublication,
            Long infoId,
            Long userId,
            boolean anonymous,
            boolean report
    ) {}

    @PostMapping
    public void addArchive(@RequestBody NewArchive request){
        ArchiveCommentary archive = new ArchiveCommentary();
        archive.setText(request.text());
        archive.setNote(request.note());
        archive.setDatePublication(request.datePublication());
        archive.setFirstname(request.firstname());
        archive.setLastname(request.lastname());
        archive.setInfoId(request.infoId());
        archive.setUserId(request.userId());
        archive.setAnonymous(request.anonymous());
        archive.setReport(request.report());
        ArchiveCommentaryRepository.save(archive);
    }

    @GetMapping("/archiveCommentary")
    public List<ArchiveCommentary> getAllCommentaryArchive() {
        return archiveCommentaryRepository.findAll();
    }


}
