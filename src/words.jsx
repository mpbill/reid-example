class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: [],
            words: [],
            done: false,
            index: 0,
            loading: false,
        };
        this.tick = this.tick.bind(this);
        this.getData = this.getData.bind(this);
        this.beginDisplay = this.beginDisplay.bind(this);



    }
    componentDidMount() {
        this.getData();
    }
    beginDisplay() {
        this.intervalId = setInterval(this.tick, 1000);
    }
    getData() {
        this.setState({loading: true});
        fetch('https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1',)
            .then((d) => d.json())
            .then((data) => {
                const words = data[0].split(' ');
                this.setState({
                    words: words,
                    done: false,
                    index: 0,
                    display: [],
                    loading: false
                });
                this.beginDisplay();
            })
    }
    tick() {
        this.setState((state, props) => {
            if (state.done) {
                return state;

            }
            if (!state.words[state.index]) {
                return {
                    done: true,
                }
            }
            return {
                display: state.display.concat(state.words[state.index]),
                words: state.words,
                index: state.index + 1
            }
        });
    }
    componentDidUpdate() {
        if (this.state.done && !this.state.loading) {
            this.reset();
        }
    }
    reset(){
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.setState({
            display: [],
            words: [],
            done: false,
            index: 0,
            loading: true
        });
        setTimeout(this.getData, 5000);
    }
    words(w) {
        const words = w.map((w, i) => <span key={i}>{w} </span>);
        if (this.state.done) {
            words.push(<span key={10000}>fart</span>)
        }
        return <span className='container'>{words}</span>
    }
    render() {
        return this.words(this.state.display)
    }
}

const e = React.createElement;

const domContainer = document.querySelector('#words_container');
ReactDOM.render(e(LikeButton), domContainer);