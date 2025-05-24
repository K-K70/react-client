import React, { Component } from 'react';

type State = {
  imageSrc: string | null;
};

class ImageDisplay extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      imageSrc: null
    };
  }

  handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ imageSrc: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  render() {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <h1>画像を表示</h1>
        <input 
          type="file" 
          accept="image/*" 
          onChange={this.handleImageChange} 
          style={{ marginBottom: '20px' }} 
        />
        <div style={{ marginTop: '20px' }}>
          {this.state.imageSrc ? (
            <img 
              src={this.state.imageSrc} 
              alt="選択された画像" 
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

export default ImageDisplay;
