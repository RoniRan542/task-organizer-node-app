exports.createTaskValidator = (req, res, next) => {
    // for title
    req.check('title','write a title').notEmpty();
    req.check('title','Title must be between 4 to 150 characters').isLength({
        min: 4,
        max: 150
    });

    // for body 
    req.check('body','write a body').notEmpty();
    req.check('body','Body must be between 4 to 2000 characters').isLength({
        min: 4,
        max: 2000
    });

    // for author 
    req.check('author','write a your name').notEmpty();
    req.check('author','name must be between 2 to 20 characters').isLength({
        min: 2,
        max: 20
    });

    //check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if(errors) {
        const firstErr = errors.map((error) => error.msg)[0];
        return res.status(400).json({ 
            error: firstErr
        })
    
    }
    // proceed to next middleware
    next();
}

exports.createUserValidator = (req,res,next) => {
    req.check('firstName','write your first name').notEmpty();
    req.check('lastName','write your last name').notEmpty();

    const errors = req.validationErrors();
    if(errors){
        const firstErr = errors.map((error) => error.msg)[0];
        return res.status(400).json({ 
            error: firstErr
        })
    }

    next();
}