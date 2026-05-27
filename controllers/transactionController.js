const Transaction = require("../models/Transaction");

exports.getAll = async (req, res) => {
  try {
    const { type, category, month, year, search } = req.query;
    const query = {};
    if (type)     query.type     = type;
    if (category) query.category = category;
    if (search)   query.description = { $regex: search, $options: "i" };
    if (month && year) {
      query.date = {
        $gte: new Date(year, month - 1, 1),
        $lt:  new Date(year, month,     1),
      };
    }
    const data = await Transaction.find(query).sort({ date: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const t = await Transaction.create(req.body);
    res.status(201).json({ success: true, data: t });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const t = await Transaction.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!t) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: t });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const t = await Transaction.findByIdAndDelete(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const monthly = await Transaction.aggregate([
      { $group: {
        _id:   { year: { $year: "$date" }, month: { $month: "$date" }, type: "$type" },
        total: { $sum: "$amount" }
      }},
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    const byCategory = await Transaction.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } }
    ]);
    res.json({ success: true, data: { monthly, byCategory } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.exportCSV = async (req, res) => {
  try {
    const data = await Transaction.find().sort({ date: -1 }).lean();
    const rows = data.map(t =>
      [new Date(t.date).toLocaleDateString("en-IN"),
       t.type, t.category, t.description, t.amount].join(",")
    ).join("\n");
    const csv = "Date,Type,Category,Description,Amount\n" + rows;
    res.header("Content-Type", "text/csv");
    res.attachment("transactions.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};