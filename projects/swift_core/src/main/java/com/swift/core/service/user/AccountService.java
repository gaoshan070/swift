package com.swift.core.service.user;

import com.swift.core.domain.user.AccountDO;

import java.util.List;
import java.util.Map;

/**
 * Created by gaoshan on 9/11/18.
 */
public interface AccountService {

    AccountDO get(Long accountId);

    List<AccountDO> list(Map<String, Object> map);

    int count(Map<String, Object> map);

    int update(AccountDO account);

    int remove(Long accountId);
}
