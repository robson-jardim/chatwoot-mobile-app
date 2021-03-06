import React, { useState } from 'react';
import { TouchableOpacity, View, Dimensions, Image } from 'react-native';
import PropTypes from 'prop-types';
import { withStyles, Icon } from '@ui-kitten/components';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

import ImageLoader from './ImageLoader';

import CustomText from './Text';
import i18n from '../i18n';

const styles = (theme) => ({
  fileViewRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    maxWidth: Dimensions.get('window').width - 120,
    left: 4,
    backgroundColor: theme['color-background-message'],
    elevation: 1,
  },

  fileViewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    maxWidth: Dimensions.get('window').width - 120,
    left: -4,
    backgroundColor: theme['background-basic-color-1'],
    elevation: 1,
  },
  imageViewLeft: {
    borderRadius: 8,
    borderTopRightRadius: 8,
    left: -4,
  },

  imageViewRight: {
    borderRadius: 8,
    borderTopLeftRadius: 8,
    left: 4,
  },
  imageLoader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: theme['color-background-message'],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderTopLeftRadius: 8,
  },

  image: {
    height: deviceHeight / 5,
    width: deviceWidth / 2,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    alignSelf: 'center',
  },
  fileAttachmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachmentIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  attachmentTexView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  fileAttachmentView: {
    flexDirection: 'row',
  },
  attachmentTextView: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  filenameText: {
    color: theme['text-basic-color'],
    fontSize: theme['font-size-small'],
    fontWeight: theme['font-medium'],
    textAlign: 'left',
  },

  downloadText: {
    color: theme['color-primary-default'],
    fontSize: theme['font-size-small'],
    fontWeight: theme['font-medium'],
    textAlign: 'left',
    alignSelf: 'stretch',
  },
});

const propTypes = {
  themedStyle: PropTypes.object,
  theme: PropTypes.object,
  type: PropTypes.string,
  showAttachment: PropTypes.func,
  attachment: PropTypes.object,
};

const FileIcon = (style) => {
  return <Icon {...style} name="file-text-outline" width={48} height={48} />;
};

const ChatAttachmentItemComponent = ({
  type,
  attachment,
  showAttachment,
  themedStyle,
  theme,
}) => {
  const [imageLoading, onLoadImage] = useState(false);

  const { file_type: fileType, data_url: dataUrl } = attachment;
  const fileName = dataUrl ? dataUrl.split('/').reverse()[0] : '';

  return (
    <React.Fragment>
      {fileType !== 'file' ? (
        <TouchableOpacity
          onPress={() => showAttachment({ type: 'image', dataUrl })}
          style={
            type === 'outgoing'
              ? themedStyle.imageViewRight
              : themedStyle.imageViewLeft
          }>
          <Image
            style={themedStyle.image}
            source={{
              uri: dataUrl,
            }}
            onLoadStart={() => onLoadImage(true)}
            onLoadEnd={() => {
              onLoadImage(false);
            }}
          />
          {imageLoading && <ImageLoader style={themedStyle.imageLoader} />}
        </TouchableOpacity>
      ) : (
        <View
          style={
            type === 'outgoing'
              ? themedStyle.fileViewRight
              : themedStyle.fileViewLeft
          }>
          <View style={themedStyle.fileAttachmentContainer}>
            <View style={themedStyle.fileAttachmentView}>
              <View style={themedStyle.attachmentIconView}>
                <FileIcon
                  style={themedStyle.icon}
                  fill={theme['color-primary-default']}
                />
              </View>
              <View style={themedStyle.attachmentTexView}>
                <CustomText style={themedStyle.filenameText}>
                  {fileName.length < 30
                    ? `${fileName}`
                    : `...${fileName.substr(fileName.length - 15)}`}
                </CustomText>
                <TouchableOpacity
                  onPress={() => showAttachment({ type: 'file', dataUrl })}>
                  <CustomText style={themedStyle.downloadText}>
                    {i18n.t('CONVERSATION.DOWNLOAD')}
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </React.Fragment>
  );
};

ChatAttachmentItemComponent.propTypes = propTypes;

const ChatAttachmentItem = withStyles(ChatAttachmentItemComponent, styles);
export default ChatAttachmentItem;
