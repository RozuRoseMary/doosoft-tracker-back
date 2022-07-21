const { User, Income, Expense } = require("../models");
const createError = require("../services/createError");
const { addProps } = require("../services/trackerService");

exports.getAllTracker = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const allIncome = await Income.findAll({ where: { userId } });
    const allExpense = await Expense.findAll({ where: { userId } });

    addProps(allIncome, "type", "INCOME");
    addProps(allExpense, "type", "EXPENSE");

    const allTracker = { allIncome, allExpense };

    res.json({ allTracker });
  } catch (err) {
    next(err);
  }
};

exports.getTrackerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if (userId !== user.id) {
      createError("You are unauthorized.", 400);
    }

    let tracker;
    if (type === "INCOME") {
      tracker = await Income.findOne({ where: { id, userId } });
    } else if (type === "EXPENSE") {
      tracker = await Expense.findOne({ where: { id, userId } });
    }

    if (!tracker || tracker == null) {
      createError("Can not find this transaction.", 400);
    }

    tracker = tracker.toJSON();
    tracker.type = type;

    res.json({ tracker });
  } catch (err) {
    next(err);
  }
};

exports.createTracker = async (req, res, next) => {
  try {
    const { date, itemName, amount, type } = req.body;

    const userId = req.user.id;

    if (!date || !itemName || !amount || !type) {
      createError("Some data are missing.", 400);
    }

    if (!itemName) {
      createError("Title is required.", 400);
    }

    if (type === "INCOME") {
      await Income.create({
        date,
        itemName,
        amount,
        userId,
      });
    } else if (type === "EXPENSE") {
      await Expense.create({
        date,
        itemName,
        amount,
        userId,
      });
    } else createError("Cannot create this transaction.", 400);

    res.json({ message: "Create success." });
  } catch (err) {
    next(err);
  }
};

exports.updateTracker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { itemName, amount, type, changeType } = req.body;
    const userId = req.user.id;

    if (type === "INCOME") {
      const income = await Income.findOne({ where: { id, userId } });

      if (!income) {
        createError("Cannot find this income.", 400);
      }

      if (changeType) {
        await Expense.create({
          itemName: itemName ? itemName : income.itemName,
          amount: amount ? amount : income.amount,
        });
        await income.destroy();
      }

      // if not change type
      if (itemName) {
        income.itemName = itemName;
      }
      if (amount) {
        income.amount = amount;
      }

      await income.save();
    } else if (type === "EXPENSE") {
      const expense = await Expense.findOne({ where: { id, userId } });

      if (!expense) {
        createError("Cannot find this expense.", 400);
      }

      if (changeType) {
        await Expense.create({
          itemName: itemName ? itemName : expense.itemName,
          amount: amount ? amount : expense.amount,
        });
        await expense.destroy();
      }

      // if not change type
      if (itemName) {
        expense.itemName = itemName;
      }
      if (amount) {
        expense.amount = amount;
      }

      await expense.save();
    }

    res.json({ message: "Update success." });
  } catch (err) {
    next(err);
  }
};

exports.deleteIncome = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const income = await Income.findOne({ where: { id, userId } });

    if (!income) {
      createError("Can not find this income.", 400);
    }

    await Income.destroy({ where: { id: income.id } });

    res.json({ message: "Delete success." });
  } catch (err) {
    next(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await Expense.findOne({ where: { id, userId } });

    if (!expense) {
      createError("Can not find this expense.", 400);
    }

    await Expense.destroy({ where: { id: expense.id } });

    res.json({ message: "Delete success." });
  } catch (err) {
    next(err);
  }
};
