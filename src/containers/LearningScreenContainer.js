import {connect} from 'react-redux';
import Learning from '../screens/Learning';
import {
  themeMode,
  seenPhrases,
  userPhrases,
  learntPhrases,
  categoriesRoot,
  categoryPhrasesRoot,
  currentCategoryName,
  nativeLanguageRoot,
  currentCategoryIdRoot,
} from '../redux/selectors';

import {
  addSeenPhrases,
  updateSeenPhrases,
  switchLanguages,
  setLearntPhrases,
  switchThemeMode,
  addLearntPhrase,
  removeLearntPhrase,
} from '../redux/actions';

function mapStateToProps(state) {
  return {
    themeMode: themeMode(state),
    seenPhrases: seenPhrases(state),
    userPhrases: userPhrases(state),
    categories: categoriesRoot(state),
    learntPhrases: learntPhrases(state),
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryName: currentCategoryName(state),
    nativeLanguage: nativeLanguageRoot(state),
    currentCategoryId: currentCategoryIdRoot(state),
  };
}

const mapDispatchToProps = {
  addSeenPhrases,
  switchThemeMode,
  addLearntPhrase,
  setLearntPhrases,
  updateSeenPhrases,
  switchLanguages,
  addLearntPhrase,
  removeLearntPhrase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
