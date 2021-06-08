import {connect} from 'react-redux';
import Home from '../screens/Home';
import {
  setCategories,
  setCurrentCategory,
  setPhrases,
  syncStorageToRedux,
  switchLanguages,
} from '../redux/actions';

import {
  userPhrases,
  seenPhrases,
  learntPhrases,
  categoriesRoot,
  nativeLanguageRoot,
} from '../redux/selectors';

function mapStateToProps(state) {
  return {
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
