import {connect} from 'react-redux';
import Home from '../screens/Home';
import {
  setCategories,
  setCurrentCategory,
  setPhrases,
  syncStorageToRedux,
} from '../redux/actions';
import {
  categoriesRoot,
  nativeLanguageRoot,
  userPhrases,
} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
    userPhrases: userPhrases(state),
  };
}
const mapDispatchToProps = {
  setCategories,
  setCurrentCategory,
  setPhrases,
  syncStorageToRedux,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
