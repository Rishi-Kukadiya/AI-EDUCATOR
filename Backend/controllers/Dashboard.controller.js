import Chapter from "../models/chapter.model.js";

const Dashboard = async (req, res) => {
  try {
    const { standard, board } = req.body;

    if (!standard || !board) {
      return res.status(400).json({
        success: false,
        message: "Standard and Board are required",
      });
    }

    if((board !=="GSEB") && (board!=="CBSE")){
        return res.status(400).json({
            success: false,
            message: "Invalid board selected",  
        })
    };

    const data = await Chapter.aggregate([
      {
        $match: {
          standard: Number(standard),
          board: board,
        },
      },
      {
        $group: {
          _id: "$subject",
          chapters: {
            $push: {
              _id: "$_id",
              chapterName: "$chapterName",
              pdfUrl: "$pdfUrl",
              createdAt: "$createdAt",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          subject: "$_id",
          chapters: 1,
        },
      },
      {
        $sort: { subject: 1 },
      },
    ]);

    return res.status(200).json({
      success: true,
      standard,
      board,
      subjects: data,
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

export default Dashboard;
