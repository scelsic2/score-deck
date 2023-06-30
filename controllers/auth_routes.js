const router = require('express').Router();
const { User, Course, Tee, Hole, Par, Score } = require('../models/index')

let isLoggedIn = false

function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/auth/login');
  }
  next();
}

// GET REGISTER
router.get('/register', async(req, res) => {
    res.render('register')
})

// GET LOGIN
router.get('/login', async(req, res) => {
    res.render('login')
})

// POST REGISTER
router.post('/register', async (req, res) => {
    
  const user_data = req.body;
  console.log('post register user_data is: ' + user_data)

  try {
    const user = await User.create(user_data)

    req.session.user_id = user.id;
    req.session.userEmail = user.email

    if(user) {
      isLoggedIn = true  
    } else {
        isLoggedIn = false
    }

    console.log('user_data from post register route is:')
    console.log(user_data)

    res.redirect(`/auth/user/${user.id}/scorecard`)
    
  } catch (err) {
    console.error(err)
    res.render('register', { error: 'A user with this email already exists.' });
  }
})

// POST LOGIN
router.post('/login', async (req, res) => {
  
  const user_data = req.body;

  try {
    const user = await User.findOne({
    where: {
      email: user_data.email
    }
  });
  
  if(!user) return res.redirect('/auth/register');

  const valid_pass = await user.validatePass(user_data.password);

  if(!valid_pass) return res.render('login', { error: 'Email and password do not match.' });

  if(user) {
    isLoggedIn = true  
  } else {
      isLoggedIn = false
  }

  req.session.user_id = user.id;
  req.session.userEmail = user.email
  console.log('-----Login post route user:-----')
  console.log(user)
  console.log('-----Login post route user_data:-----')
  console.log(user_data)
  console.log('-----Login post route user_data.email:-----')
  console.log(user_data.email)
  console.log('-----Login post route user.id:-----')
  console.log(user.id)

  console.log('-----Login post route user.email:-----')
  console.log(user.email)
  res.redirect(`/auth/user/${user.id}/scorecard`)
  } catch(err) {
      console.error(err)
  }
  
})

// GET SCORECARD
router.get('/user/:id/scorecard', async (req, res) => {

    try {
      const user = await User.findByPk(req.session.user_id);

      console.log('-----req.session.user_id-----')
      console.log(req.session.user_id)
      console.log('-----user on scorecard page-----')
      console.log(user)

      let courses = [];
      let tee;
      let par = [];
      let score;

      if(user) {
        courses = await Course.findAll({
          where: {
            user_id: req.session.user_id
          }
        })

        console.log('-----courses.length-----')
        console.log(courses.length)
        console.log('-----courses on scorecard page is-----')
        console.log(courses)
        // console.log('-----courses[0].dataValues.id-----')
        // console.log(courses[0].dataValues.id)

        // for (i = 0; i < courses.length; i++) {
        //   par = await Par.findAll({
        //     where: {
        //       course_id: courses[i].dataValues.id
        //     }
        //   })
        // }

      } else {
        console.log('No user.')
        return res.redirect('/auth/login')
      }
  
      if(user) {
          isLoggedIn = true  
      } else {
          isLoggedIn = false
      }
  
      console.log('-----User on scorecard page is:-----')
      console.log(user)
      console.log('-----user.dataValues.email on scorecard page is:-----')
      console.log(user.dataValues.email)
      console.log('-----req.session.user_id-----')
      console.log(req.session.user_id)
      console.log('-----courses on scorecard page is-----')
      console.log(courses)
      // console.log('-----par on scorecard page is-----')
      // console.log(par)
      // console.log('-----par [0] dataValues on scorecard page is-----')
      // console.log(par[0].dataValues)

      const email = user.dataValues.email
      const atIndex = email.indexOf('@')
      const username = email.substring(0, atIndex)

      res.render('scorecards', { 
        id: req.session.user_id,
        username: username,
        isLoggedIn: isLoggedIn,
        courses: courses,
        // par: par,
    });

    } catch (err) {
      console.error(' something failed on this try/catch', err)
      res.status(500).json({ error: 'An error occurred while fetching the user information.' });
    }
});

// GET ADD A COURSE
router.get('/user/:id/add_a_course', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.session.user_id
      }
    })

    console.log('-----User on add a course is: -----')
    console.log(user)

    console.log('-----req.session.user_id-----')
    console.log(req.session.user_id)

    if (!user) console.log('No user') 
    if (!user) return res.redirect('/auth/login')

    if(user) {
      isLoggedIn = true  
    } else {
      isLoggedIn = false
    }
    console.log('-----Router.get user.id on add a course-----: ')
    console.log(user.id)
    const userId = req.session.user_id
    console.log('-----userId from add a course page-----')
    console.log(userId)
    console.log('-----req.session from my user at id add a course page-----')
    console.log(req.session)

    const email = user.email
    const atIndex = email.indexOf('@')
    const username = email.substring(0, atIndex)

    res.render('add_a_course', { 
      id: userId,
      username: username,
      isLoggedIn: isLoggedIn,
  });

  } catch (err) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

// POST COURSE
router.post('/user/add_a_course', async (req, res) => {
  try{
    const userId = req.session.user_id;
    console.log('-----userId from post add a course-----')
    console.log(userId)
    const user = await User.findByPk(userId)
  
    if(user) {
      isLoggedIn = true  
    } else {
      isLoggedIn = false
    }
    const input = req.body

    const course = await Course.create({
      course_name: input.course_name,
      city: input.city,
      state: input.state,
      user_id: userId,
      userId: userId,
    })

    console.log('-----Course created-----');
    console.log(course)
    console.log('-----input (req.body) -----')
    res.redirect(`/auth/user/add_a_course/${course.id}/tee/`)
  } catch (err) {
    console.error(err)
  }
})

// POST A TEE
router.post('/user/add_a_course_tee', async (req, res) => {
  try{
    const userId = req.session.user_id;
    console.log('-----userId from post add a course tee-----')
    console.log(userId)
    const user = await User.findByPk(userId)
  
    if(user) {
      isLoggedIn = true  
    } else {
      isLoggedIn = false
    }
    const input = req.body

    console.log('-----input-----')
    console.log(input)
    console.log('-----input.tee-----')
    console.log(input.tee)

    const course = await Course.findOne({
      where: { 
        user_id: userId
      },
      order:[['createdAt', 'DESC']]
    })

    const tee = await Tee.create({
      tee: input.tees,
      course_id: course.dataValues.id,
      courseId: course.dataValues.id
    })

    console.log('-----Tee created-----');
    console.log(tee)
    console.log('-----Captured course-----')
    console.log(course)
    console.log('-----input (req.body) -----')
    res.redirect(`/auth/user/add_a_course/${course.id}/par`)
  } catch (err) {
    console.error(err)
  }
})

// GET A TEE
router.get('/user/add_a_course/:id/tee', async (req, res) => {

  try {
    
    const userId = req.session.user_id

    const course = await Course.findOne({
      where: { 
        user_id: userId
      },
      order:[['createdAt', 'DESC']]
    })

    console.log('-----Course on add a course tee is: -----')
    console.log(course)
    console.log('-----req.session.user_id-----')
    console.log(userId)

    if (!userId) console.log('No course') 
    if (!userId) return res.redirect('/auth/login')

    if(userId) {
      isLoggedIn = true  
    } else {
      isLoggedIn = false
    }

    res.render('add_a_course_tee', { 
      course: course,
      isLoggedIn: isLoggedIn
    });

  } catch (err){
    console.error(err)
  }
});

// GET PAR
router.get('/user/add_a_course/:id/par', async (req, res) => {

  try {
    
    const userId = req.session.user_id

    const course = await Course.findOne({
      where: { 
        user_id: userId
      },
      order:[['createdAt', 'DESC']]
    })

    console.log('-----Course on add a course par is: -----')
    console.log(course)
    console.log('-----req.session.user_id-----')
    console.log(userId)

    if (!userId) console.log('No course') 
    if (!userId) return res.redirect('/auth/login')

    if(userId) {
      isLoggedIn = true  
    } else {
      isLoggedIn = false
    }

    res.render('add_a_course_par', { 
      course: course,
      isLoggedIn: isLoggedIn
    });

  } catch (err){
    console.error(err)
  }
});

// POST COURSE PAR
router.post('/user/add_a_course_par', async (req, res) => {
  
  try{
    const userId = req.session.user_id;
    console.log('-----userId from post add a par-----')
    console.log(userId)
    const user = await User.findByPk(userId)
  
    if(user) {
      isLoggedIn = true  
    } else {
      isLoggedIn = false
    }
    const input = req.body
    console.log('-----input-----')
    console.log(input)
  
    const course = await Course.findOne({
      where: { 
        user_id: userId
      },
      order:[['createdAt', 'DESC']]
    })

    const tee = await Tee.findOne({
      where: {
        course_id: course.dataValues.id
      }
    })

    console.log('-----tee-----')
    console.log(tee)

    let par
    let hole

    for(t = 1; t < 19; t++) {
      // hole = await Hole.create({
      //   hole_number: t,
      //   course_id: course.dataValues.id,
      //   tee_id: tee.dataValues.id,
      //   teeId: tee.dataValues.id,
      // })
      
      par = await Par.create({
          par: input['hole' + t],
          hole_id: t,
          // hole_id: hole.dataValues.id,
          tee_id: tee.dataValues.id,
          course_id: course.dataValues.id,
          teeId: tee.dataValues.id,
      })
      
    }

    console.log('-----par added-----');
    console.log(par)
    console.log('-----par at hole-----')
    console.log(par.hole_id)

    res.redirect(`/auth/user/${userId}/scorecard`)

    console.log('++++++++++my scorecard has been added++++++++++')

  } catch (err) {
    res.status(500).send({ error: err })
}
})

// GET SINGLE COURSE
router.get('/user/single_course/:id', async (req, res) => {

  try {
    const userId = req.session.user_id

    const course = await Course.findOne({
      where: { 
        user_id: userId,
        course_name: req.params.id
      }
    })

    const courses = await Course.findAll({
        where: {
          user_id: userId,
        }
    })

    console.log('-----course from get single course-----')
    console.log(course)

    if (!userId) return res.redirect('/auth/login')

    if(userId) {
      isLoggedIn = true  
    } else {
      isLoggedIn = false
    }

    console.log('-----req.params-----')
    console.log(req.params)

    res.render('single_course', {
      id: userId,
      course: course,
      courses: courses,
      isLoggedIn: isLoggedIn
    })
  } catch (err) {
    console.error(err)
  }

})

// GET Add a Scorecard
router.get('/user/add_a_scorecard', async (req, res) => {
  
  try {

    const userId = req.session.user_id

    const courses = await Course.findAll({
      where: {
        user_id: userId,
      }
  })

      if (!userId) return res.redirect('/auth/login')

      if(userId) {
        isLoggedIn = true  
      } else {
        isLoggedIn = false
      }

      console.log('-----courses from Add A Scorecard-----')
      console.log(courses)

      res.render('add_a_scorecard', {
        id: userId,
        courses: courses,
        isLoggedIn: isLoggedIn
      })

  } catch (err) {
    console.error(err)
  }
})

router.get('/logout', (req, res)=> {
  req.session.destroy()
  isLoggedIn = false
  res.redirect('/')
  console.log('User logged out.')
})

module.exports = router;