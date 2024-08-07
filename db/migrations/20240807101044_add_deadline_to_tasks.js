/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('tasks', function(t) {
        t.date('deadline'); // 新しい列を追加
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('tasks', function(t) {
        t.dropColumn('deadline'); // 列を削除
    });
};
