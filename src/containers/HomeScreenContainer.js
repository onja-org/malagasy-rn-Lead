import {connect} from 'react-redux';
import Home from '../screens/Home';

import {
  userPhrases,
  seenPhrases,
  learntPhrases,
  categoriesRoot,
  nativeLanguageRoot,
} from '../redux/selectors';

import {
  setPhrases,
  setCategories,
  setCurrentCategory,
  syncStorageToRedux,
} from '../redux/actions';

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
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
