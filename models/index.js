const User = require('./User');
const Course = require('./Course');
const Tee = require('./Tee');
const Hole = require('./Hole');
const Par = require('./Par');
const Score = require('./Score');

User.hasMany(Course, {foreignKey: Course.user_id});
User.hasMany(Score, {foreignKey: Score.user_id});

Course.belongsTo(User, {foreignKey: Course.user_id});

Course.hasMany(Tee, {foreignKey: Tee.course_id});

Hole.belongsTo(Tee, {foreignKey: Hole.tee_id})
Par.belongsTo(Tee, {foreignKey: Par.tee_id});
Score.belongsTo(Tee, {foreignKey: Score.tee_id});

Course.belongsToMany(Hole, {
    through: "course_hole",
    as: "course_holes",
    foreignKey: "course_id"
});

Hole.belongsToMany(Course, {
    through: "course_hole",
    as: "hole_courses",
    foreignKey: "hole_id"
})

Course.belongsToMany(Par, {
    through: "course_par",
    as: "course_pars",
    foreignKey: "course_id"
});

Par.belongsToMany(Course, {
    through: "course_par",
    as: "par_courses",
    foreignKey: "par_id"
})

Score.belongsToMany(Hole, {
    through: "hole_score",
    as: "score_holes",
    foreignKey: "score_id"
});

Hole.belongsToMany(Score, {
    through: "hole_score",
    as: "hole_scores",
    foreignKey: "hole_id"
})

Par.belongsToMany(Hole, {
    through: "hole_par",
    as: "par_holes",
    foreignKey: "par_id"
});

Hole.belongsToMany(Par, {
    through: "hole_par",
    as: "hole_pars",
    foreignKey: "hole_id"
})

Par.belongsToMany(Score, {
    through: "hole_score",
    as: "par_scores",
    foreignKey: "par_id"
});

module.exports = { User , Course, Tee, Hole, Score, Par };