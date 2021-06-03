const User = require('./../../models/user');
const logger = require('./../../lib/logger');

const saveFeedback = async (id, feedback) => {
  try {
    await User.findOneAndUpdate(
      {
        id_telegram: id,
      },
      {
        $push: {
          tutorials: {
            ...feedback,
          },
        },
      },
      { useFindAndModify: false }
    );

    logger.debug('Feedback OK');
  } catch (e) {
    logger.error(e);
  }
};

module.exports = saveFeedback;
