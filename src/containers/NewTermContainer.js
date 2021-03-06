import {connect} from 'react-redux';
import NewTerm from '../screens/NewTerm';
import {
  categoriesRoot,
  nativeLanguageRoot,
  themeMode,
} from '../redux/selectors';
import {
  setCategories,
  addNewPhrases,
  switchLanguages,
  switchThemeMode,
} from '../redux/actions';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
    themeMode: themeMode(state),
  };
}

const mapDispatchToProps = {
  setCategories,
  addNewPhrases,
  switchLanguages,
  switchThemeMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTerm);
