package com.appsmith.server.services;

import com.appsmith.server.domains.UserData;
import com.appsmith.server.repositories.UserDataRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Service;
import reactor.core.scheduler.Scheduler;

import javax.validation.Validator;

@Slf4j
@Service
public class GitServiceImpl extends BaseService<UserDataRepository, UserData, String> implements GitService {

    public GitServiceImpl(Scheduler scheduler,
                          Validator validator,
                          MongoConverter mongoConverter,
                          ReactiveMongoTemplate reactiveMongoTemplate,
                          UserDataRepository repository,
                          AnalyticsService analyticsService) {
        super(scheduler, validator, mongoConverter, reactiveMongoTemplate, repository, analyticsService);
    }
}
