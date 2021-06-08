import {connect} from 'react-redux';
import NewTerm from '../screens/NewTerm';
import {categoriesRoot, nativeLanguageRoot} from '../redux/selectors';
import {setCategories, addNewPhrases, switchLanguages} from '../redux/actions';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
  };
}

const mapDispatchToProps = {
  setCategories,
  addNewPhrases,
  switchLanguages,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTerm);
