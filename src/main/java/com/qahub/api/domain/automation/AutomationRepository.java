package com.qahub.api.domain.automation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AutomationRepository extends JpaRepository<Automation, Long> {
    Page<Automation> findAll(Pageable pagination);
}
