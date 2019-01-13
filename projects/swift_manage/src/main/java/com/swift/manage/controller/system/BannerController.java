package com.swift.manage.controller.system;

import com.swift.core.common.redis.shiro.RedisManager;
import com.swift.core.common.utils.PageUtils;
import com.swift.core.common.utils.Query;
import com.swift.core.common.utils.R;
import com.swift.core.domain.system.BannerDO;
import com.swift.core.service.system.BannerService;
import com.swift.manage.controller.common.BaseController;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Transaction;

import java.util.List;
import java.util.Map;

/**
 * Created by gaoshan on 6/11/18.
 */
@Controller
@RequestMapping("/system/banner")
public class BannerController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(BannerController.class);

    private String prefix = "system/banner";

    private static final String BANNER_CACHE_KEY_INDEX = "banner_cache_index";
    private static final String BANNER_CACHE_KEY_SOLUTION = "banner_cache_solution";

    public static final int BANNER_SESSION_DB_INDEX = 3;

    @Autowired
    private BannerService bannerService;

    @Autowired
    private RedisManager redisManager;

    @GetMapping()
    @RequiresPermissions("system:banner")
    String banner() {
        return prefix + "/banner";
    }

    @ResponseBody
    @GetMapping("/list")
    @RequiresPermissions("system:banner:list")
    public PageUtils list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        List<BannerDO> bannerList = bannerService.list(query);
        int total = bannerService.count(query);
        PageUtils pageUtil = new PageUtils(bannerList, total);
        return pageUtil;
    }

    @RequiresPermissions("system:banner:add")
    @GetMapping("/add")
    public String add() {
        return prefix + "/add";
    }

    @RequiresPermissions("system:banner:edit")
    @GetMapping("/edit/{id}")
    String edit(Model model, @PathVariable("id") Long id) {
        BannerDO bannerDO = bannerService.get(id);
        model.addAttribute("banner", bannerDO);
        return prefix+"/edit";
    }

    @RequiresPermissions("system:banner:add")
    @PostMapping("/save")
    @ResponseBody
    R save(BannerDO banner) {
        if (bannerService.save(banner) > 0) {
            flushBannerCache();
            return R.ok();
        }
        return R.error();
    }

    @RequiresPermissions("system:banner:edit")
    @PostMapping("/update")
    @ResponseBody
    R update(BannerDO banner) {
        if (bannerService.update(banner) > 0) {
            flushBannerCache();
            return R.ok();
        }
        return R.error();
    }

    @RequiresPermissions("system:banner:remove")
    @PostMapping("/remove")
    @ResponseBody
    R remove(Long id) {
        if (bannerService.remove(id) > 0) {
            flushBannerCache();
            return R.ok();
        }
        return R.error();
    }

    @RequiresPermissions("system:banner:batchRemove")
    @PostMapping("/batchRemove")
    @ResponseBody
    R batchRemove(@RequestParam("ids[]") Long[] bannerIds) {
        int r = bannerService.batchRemove(bannerIds);
        if (r > 0) {
            flushBannerCache();
            return R.ok();
        }
        return R.error();
    }

    //TODO
    private boolean flushBannerCache(){
        boolean result = false;
        boolean isBroken = false;
        Jedis jedis = null;
        Transaction tran = null;
        try {
            jedis = redisManager.getJedis();
            jedis.select(BANNER_SESSION_DB_INDEX);
            tran = jedis.multi();
            tran.del(BANNER_CACHE_KEY_INDEX);
            tran.del(BANNER_CACHE_KEY_SOLUTION);
            tran.exec();
            result = true;
        } catch (Exception e) {
            if (tran != null)
                tran.discard();
            isBroken = true;
        } finally {
            try {
                redisManager.release(jedis, isBroken);
            } catch (Exception e) {
                logger.error("删除banner cache异常",e);
            }
        }
        return result;
    }
}
