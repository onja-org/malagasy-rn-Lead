import {connect} from 'react-redux';
import Learning from '../screens/Learning';
import {
  categoriesRoot,
  categoryPhrasesRoot,
  currentCategoryName,
  seenPhrases,
} from '../redux/selectors';
import {addSeenPhrases, updateSeenPhrases} from '../redux/actions';

function mapStateToProps(state) {
  return {
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryName: currentCategoryName(state),
    seenPhrases: seenPhrases(state),
    categories: categoriesRoot(state),
  };
}
const mapDispatchToProps = {
  addSeenPhrases,
  updateSeenPhrases,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
