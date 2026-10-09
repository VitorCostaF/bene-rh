CREATE TABLE diagnosticos (
    id            BIGINT       NOT NULL AUTO_INCREMENT,
    contact_type  VARCHAR(10)  NOT NULL,
    contact_value VARCHAR(254) NOT NULL,
    score         INT          NOT NULL,
    route         VARCHAR(120) NULL,
    consent       BOOLEAN      NOT NULL,
    source        VARCHAR(40)  NOT NULL,
    locale        VARCHAR(5)   NOT NULL,
    page          VARCHAR(500) NULL,
    utm_source    VARCHAR(200) NULL,
    utm_medium    VARCHAR(200) NULL,
    utm_campaign  VARCHAR(200) NULL,
    utm_content   VARCHAR(200) NULL,
    utm_term      VARCHAR(200) NULL,
    submitted_at  DATETIME(6)  NULL,
    created_at    DATETIME(6)  NOT NULL,
    PRIMARY KEY (id),
    INDEX idx_diagnosticos_contact (contact_value),
    INDEX idx_diagnosticos_created_at (created_at)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE diagnostico_respostas (
    id             BIGINT       NOT NULL AUTO_INCREMENT,
    diagnostico_id BIGINT       NOT NULL,
    ordem          INT          NOT NULL,
    question_id    VARCHAR(40)  NOT NULL,
    question       VARCHAR(300) NOT NULL,
    answer         VARCHAR(300) NOT NULL,
    answer_value   INT          NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_resposta_diagnostico FOREIGN KEY (diagnostico_id)
        REFERENCES diagnosticos (id) ON DELETE CASCADE,
    INDEX idx_respostas_diagnostico (diagnostico_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
