package com.portfolio.repository;

import com.portfolio.model.ProfileInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<ProfileInfo, Long> {
}
