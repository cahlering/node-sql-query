var common     = require('../common');
var assert     = require('assert');

assert.equal(
	common.Select().from('table1').build(),
	"SELECT * FROM `table1`"
);

assert.equal(
	common.Select().from('table1').select('id', 'name').build(),
	"SELECT `id`, `name` FROM `table1`"
);

assert.equal(
	common.Select().from('table1').select([ 'id', 'name' ]).build(),
	"SELECT `id`, `name` FROM `table1`"
);

assert.equal(
	common.Select().from('table1').select().build(),
	"SELECT * FROM `table1`"
);

assert.equal(
	common.Select().from('table1').select('id1', 'name')
	               .from('table2', 'id2', 'id1').select('id2').build(),
	"SELECT `t1`.`id1`, `t1`.`name`, `t2`.`id2` FROM `table1` `t1` JOIN `table2` `t2` ON `t2`.`id2` = `t1`.`id1`"
);

assert.equal(
	common.Select().from('table1').select('id1', 'name')
	               .from('table2', 'id2', 'table1', 'id1').select('id2').build(),
	"SELECT `t1`.`id1`, `t1`.`name`, `t2`.`id2` FROM `table1` `t1` JOIN `table2` `t2` ON `t2`.`id2` = `t1`.`id1`"
);

assert.equal(
	common.Select().from('table1')
	               .from('table2', 'id2', 'table1', 'id1').count().build(),
	"SELECT COUNT(*) FROM `table1` `t1` JOIN `table2` `t2` ON `t2`.`id2` = `t1`.`id1`"
);

assert.equal(
	common.Select().from('table1')
	               .from('table2', 'id2', 'table1', 'id1').count(null, 'c').build(),
	"SELECT COUNT(*) AS `c` FROM `table1` `t1` JOIN `table2` `t2` ON `t2`.`id2` = `t1`.`id1`"
);

assert.equal(
	common.Select().from('table1')
	               .from('table2', 'id2', 'table1', 'id1').count('id').build(),
	"SELECT COUNT(`t2`.`id`) FROM `table1` `t1` JOIN `table2` `t2` ON `t2`.`id2` = `t1`.`id1`"
);

assert.equal(
	common.Select().from('table1').count('id')
	               .from('table2', 'id2', 'table1', 'id1').count('id').build(),
	"SELECT COUNT(`t1`.`id`), COUNT(`t2`.`id`) FROM `table1` `t1` JOIN `table2` `t2` ON `t2`.`id2` = `t1`.`id1`"
);

assert.equal(
	common.Select().from('table1')
	               .from('table2', 'id2', 'table1', 'id1').count('id').count('col').build(),
	"SELECT COUNT(`t2`.`id`), COUNT(`t2`.`col`) FROM `table1` `t1` JOIN `table2` `t2` ON `t2`.`id2` = `t1`.`id1`"
);

assert.equal(
	common.Select().from('table1')
	               .from('table2', 'id2', 'table1', 'id1').fun('AVG', 'col').build(),
	"SELECT AVG(`t2`.`col`) FROM `table1` `t1` JOIN `table2` `t2` ON `t2`.`id2` = `t1`.`id1`"
);
