package com.incubateur.codrive;

import com.incubateur.codrive.controller.SearchController;
import com.incubateur.codrive.service.CommentaryServices;
import com.incubateur.codrive.service.InfoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
@SpringBootTest
public class CountTest{
    @Autowired
    private SearchController searchController;

    @MockBean
    private InfoService infoService;

    @MockBean
    private CommentaryServices commentaryServices;

    @Test
    public void testGetCountTravel() {
        Long id = 1L;
        int count = 10;

        when(infoService.countTravel(id)).thenReturn(count);

        Integer result = searchController.getcountTravel(id);

        assertEquals(count, result);
    }

    @Test
    public void testGetCountCommentary() {
        Long id = 1L;
        int count = 10;

        when(commentaryServices.countCommentary(id)).thenReturn(count);

        Integer result = searchController.getcountCommentary(id);

        assertEquals(count, result);
    }
}
