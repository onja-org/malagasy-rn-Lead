import {connect} from 'react-redux';
import NewTerm from '../screens/NewTerm';
import {categoriesRoot} from '../redux/selectors';
import {setCategories, addNewPhrases} from '../redux/actions';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
  };
}

const mapDispatchToProps = {
  setCategories,
  addNewPhrases,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTerm);
