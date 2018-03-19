//
//  SafeAreaSpacerViewLocalData.m
//  RNCommon
//
//  Created by Reza on 3/19/18.
//  Copyright © 2018 kajoo. All rights reserved.
//

#import "SafeAreaSpacerViewLocalData.h"

@implementation SafeAreaSpacerViewLocalData

- (instancetype)initWithInsets:(UIEdgeInsets)insets
{
    if (self = [super init]) {
        _insets = insets;
    }
    
    return self;
}

@end
