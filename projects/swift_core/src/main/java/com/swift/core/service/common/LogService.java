package com.swift.core.service.common;

import com.swift.core.common.utils.Query;
import com.swift.core.domain.common.LogDO;
import com.swift.core.domain.common.PageDO;

import org.springframework.stereotype.Service;

@Service
public interface LogService {
	void save(LogDO logDO);
	PageDO<LogDO> queryList(Query query);
	int remove(Long id);
	int batchRemove(Long[] ids);
}
