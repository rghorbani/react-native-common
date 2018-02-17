//
//  HighlighterView.h
//  RNCommon
//
//  Created by Reza on 2/17/18.
//  Copyright © 2018 kajoo. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>

#ifndef HighlighterView_h
#define HighlighterView_h

@interface HighlighterView : UIView

- (id)initWithFrame:(CGRect)frame bridge:(RCTBridge*)bridge;

@property (nonatomic) CGRect highlightFrame;
@property (nonatomic, strong) NSNumber *borderRadius;
@property (nonatomic, strong) UIColor *overlayColor;
@property (nonatomic, strong) UIColor *strokeColor;
@property (nonatomic, strong) NSNumber *strokeWidth;
@property (nonatomic, strong) NSNumber *highlightViewTag;
@property (nonatomic, strong) NSDictionary *highlightViewTagParams;

@end

#endif /* HighlighterView_h */
