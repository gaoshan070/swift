package com.swift.manage.controller.common;

import com.swift.core.common.utils.PageUtils;
import com.swift.core.common.utils.Query;
import com.swift.core.domain.common.FileDO;
import com.swift.core.service.common.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/common/media")
public class MediaController extends BaseController {

    @Autowired
    private FileService sysFileService;

    @GetMapping()
    String media(Model model) {
        Map<String, Object> params = new HashMap<>(16);
        return "common/media/media";
    }

    @ResponseBody
    @GetMapping("/list")
    public PageUtils list(@RequestParam Map<String, Object> params) {
        // 查询列表数据
        Query query = new Query(params);
        List<FileDO> sysFileList = sysFileService.list(query);
        int total = sysFileService.count(query);
        PageUtils pageUtils = new PageUtils(sysFileList, total);
        return pageUtils;
    }
}
