import classNames from 'classnames/bind';

/**
 * 单选框
 * @author tengge / https://github.com/tengge1
 * @property {String} className 样式类
 * @property {Object} style 样式
 * @property {Boolean} checked 是否选中
 */
class Radio extends React.Component {
    render() {
        const { className, style, checked } = this.props;
        return <input type={'radio'} className={classNames('Radio', checked ? 'checked' : null, className)} style={style} />;
    }
}

export default Radio;