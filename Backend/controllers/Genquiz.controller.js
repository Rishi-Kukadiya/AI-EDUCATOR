const Genquiz = async (req, res) => {
  try {
    const { ChapterUrls, Noquestions, subject , language , Chapters} = req.body;
    if (!ChapterUrls || !Noquestions || !subject || !language || !Chapters) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    if(ChapterUrls.length === 0){
        return res.status(400).json({
            success: false,
            message: "At least one chapter is required!!",
        });
    }

    if (parseInt(Noquestions) <= 0) {
      return res.status(400).json({
        success: false,
        message: "At least one question is required!!",
      });
    }

    //Logic of the question to be generated  
    return res.status(200).json({
        success: true,
        message: "Quiz generated successfully",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export default Genquiz;
