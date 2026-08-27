CREATE TABLE IF NOT EXISTS rules (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    keyword VARCHAR(255) NOT NULL,

    match_type ENUM(
        'contains',
        'starts_with',
        'ends_with',
        'exact'
    ) NOT NULL,

    action_type ENUM(
        'highlight',
        'tooltip',
        'block'
    ) NOT NULL,

    action_value VARCHAR(100) NOT NULL,

    enabled BOOLEAN NOT NULL DEFAULT TRUE,

    priority INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_keyword_not_empty
        CHECK (CHAR_LENGTH(TRIM(keyword)) > 0),

    CONSTRAINT chk_action_value_not_empty
        CHECK (CHAR_LENGTH(TRIM(action_value)) > 0),

    INDEX idx_rules_enabled_priority (enabled, priority),

    INDEX idx_rules_match_type (match_type)
);