const pool = require('../../config/database');

async function getActiveRules() {
    const [rules] = await pool.query(`
        SELECT *
        FROM rules
        WHERE enabled = 1
        ORDER BY priority DESC
    `);

    return rules;
}

function ruleMatches(content, rule) {
    const text = content.toLowerCase();
    const keyword = rule.keyword.toLowerCase();

    switch (rule.match_type) {
        case 'contains':
            return text.includes(keyword);

        case 'exact':
            return text === keyword;

        case 'starts_with':
            return text.startsWith(keyword);

        case 'ends_with':
            return text.endsWith(keyword);

        default:
            return false;
    }
}

async function filterContent(content) {
    const rules = await getActiveRules();

    const matches = [];

    for (const rule of rules) {
        if (ruleMatches(content, rule)) {
            matches.push({
                rule_id: rule.id,
                keyword: rule.keyword,
                match_type: rule.match_type,
                action_type: rule.action_type,
                action_value: rule.action_value,
                priority: rule.priority
            });
        }
    }

    return {
        original_content: content,
        filtered_content: content,
        matched_rules: matches,
        match_count: matches.length,
        blocked: matches.some(
            rule => rule.action_type === 'block'
        )
    };
}

module.exports = {
    filterContent
};