import clsx from 'clsx';
import PropTypes from 'prop-types';
import { PropTypesForIngredient } from '../../../prop-types';
import { useDispatch } from 'react-redux';
import { SET_VISIBLE_MODAL_INGREDIENT } from '../../../services/actions/app';
import styles from './ingredient.module.css';
import { useDrag } from 'react-dnd';

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Ingredient = ({ item }) => {
  const classForPrice = clsx(styles.price, 'mt-1 mb-1');

  const handleOpenModal = () => {
    dispatch({
      type: SET_VISIBLE_MODAL_INGREDIENT,
    });
  };

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const ingredientId = item['_id'];
  return (
    <Link
      key={ingredientId}
      to={{
        // Тут мы формируем динамический путь для нашего ингредиента
        // а также сохраняем в свойство background роут, на котором была открыта наша модалка.
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <li
        className={styles.ingredient}
        onClick={handleOpenModal}
        ref={dragRef}
        style={{ opacity }}
      >
        {item.count > 0 && <Counter count={item.count} size="default" />}
        <img src={item.image} alt={item.type} width="240px" height="120px" />
        <div className={classForPrice}>
          <span className="text text_type_digits-default mr-2">
            {item.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className="text text_type_main-default">{item.name}</h3>
      </li>
    </Link>
  );
};

Ingredient.propTypes = {
  item: PropTypes.shape(PropTypesForIngredient).isRequired,
};

export default Ingredient;
