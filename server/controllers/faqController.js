import FAQ from '../models/FAQ.js';

export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isPublished: true })
      .sort({ order: 1 })
      .select('-__v');

    // Transform to match frontend expectations
    const transformedFAQs = faqs.map(faq => ({
      id: faq._id,
      question: faq.question,
      answer: faq.answer
    }));

    res.status(200).json({
      success: true,
      count: transformedFAQs.length,
      data: transformedFAQs
    });
  } catch (error) {
    console.error('Get FAQs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch FAQs',
      error: error.message
    });
  }
};

export const createFAQ = async (req, res) => {
  try {
    const { question, answer, order, isPublished, category } = req.body;

    const faq = new FAQ({
      question,
      answer,
      order: order || 0,
      isPublished: isPublished !== undefined ? isPublished : true,
      category
    });

    const savedFAQ = await faq.save();

    res.status(201).json({
      success: true,
      message: 'FAQ created successfully',
      data: savedFAQ
    });
  } catch (error) {
    console.error('Create FAQ error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create FAQ',
      error: error.message
    });
  }
};

export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const faq = await FAQ.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'FAQ updated successfully',
      data: faq
    });
  } catch (error) {
    console.error('Update FAQ error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update FAQ',
      error: error.message
    });
  }
};

export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    const faq = await FAQ.findByIdAndDelete(id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'FAQ deleted successfully'
    });
  } catch (error) {
    console.error('Delete FAQ error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete FAQ',
      error: error.message
    });
  }
};
