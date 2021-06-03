import {connect} from 'react-redux';
import Learning from '../screens/Learning';
import {
  seenPhrases,
  userPhrases,
  learntPhrases,
  categoriesRoot,
  categoryPhrasesRoot,
  currentCategoryName,
} from '../redux/selectors';

import {
  addSeenPhrases,
  addLearntPhrase,
  setLearntPhrases,
  updateSeenPhrases,
  removeLearntPhrase,
} from '../redux/actions';

function mapStateToProps(state) {
  return {
    seenPhrases: seenPhrases(state),
    userPhrases: userPhrases(state),
    categories: categoriesRoot(state),
    learntPhrases: learntPhrases(state),
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryName: currentCategoryName(state),
  };
}

const mapDispatchToProps = {
  addSeenPhrases,
  addLearntPhrase,
  setLearntPhrases,
  updateSeenPhrases,
  removeLearntPhrase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
