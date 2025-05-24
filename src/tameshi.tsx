import React from 'react';

type State = {
  imageSrc: string | null;
};

class ImageSwitcher extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      imageSrc: null
    };
  }

  handleShowImage = () => {
    const imageUrl = "https://www.tadapic.com/img/newstopic/icon_d.jpg"; // 表示したい画像URLに変更
    this.setState({ imageSrc: imageUrl });
  };

  render() {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      {/* <div> */}
        <button onClick={this.handleShowImage}>画像を表示</button>
        <div style={{ marginTop: '20px' }}>
          {this.state.imageSrc ? (
            <img
              src={this.state.imageSrc}
              alt="表示画像"
              style={{ width: '300px', height: 'auto' }}
            />
          ) : (
            <p>画像はまだ表示されていません</p>
          )}
        </div>
      </div>
    );
  }
}

export default ImageSwitcher;
