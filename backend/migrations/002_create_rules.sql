INSERT INTO rules
    (keyword, match_type, action_type, action_value, enabled, priority)
VALUES
    ('urgent', 'contains', 'highlight', '#ff0000', TRUE, 10),
    ('meeting', 'contains', 'highlight', '#0000ff', TRUE, 5),
    ('deadline', 'contains', 'tooltip', 'IMPORTANT', TRUE, 10);