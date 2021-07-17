import {connect} from 'react-redux';
import Home from '../screens/Home';
import {
  setPhrases,
  setCategories,
  setCurrentCategory,
  syncStorageToRedux,
  switchLanguages,
  switchThemeMode,
  asyncGetAllCategories,
} from '../redux/actions';

import {
  themeMode,
  userPhrases,
  seenPhrases,
  learntPhrases,
  categoriesRoot,
  nativeLanguageRoot,
} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    themeMode: themeMode(state),
    userPhrases: userPhrases(state),
    seenPhrases: seenPhrases(state),
    categories: categoriesRoot(state),
    learntPhrases: learntPhrases(state),
    nativeLanguage: nativeLanguageRoot(state),
  };
}

const mapDispatchToProps = {
  setPhrases,
  setCategories,
  setCurrentCategory,
  syncStorageToRedux,
  switchLanguages,
  asyncGetAllCategories,
  switchThemeMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
